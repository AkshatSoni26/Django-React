# Create your views here.
import io
import sys
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password


import io
import json
import sys
from django.http import JsonResponse
from .models import CodeSubmission, UserProfile
import subprocess





@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            request_body = request.body
            user_data = json.loads(request_body)

            username = user_data['username']
            password = user_data['password']

            if not (username and password):
                return JsonResponse({'error': 'Username and password are required.'}, status=400)

            # Check if the username exists in the database
            user = UserProfile.objects.filter(username=username).values().first()

            if (user['username'] == username ) and check_password(password, user['password']):
                # Username exists and password is correct
                return JsonResponse({'message': 'Login successful.', 'user_id': user['id'], 'code': 200}, status=200)
            else:
                # Username does not exist or password is incorrect
                return JsonResponse({'error': 'Invalid username or password.'}, status=401)
        except Exception as e:
            # Handle any other exceptions
            print(e)
            return JsonResponse({'error': 'An error occurred.'}, status=500)

    # Return method not allowed for other HTTP methods
    return JsonResponse({'error': 'Method not allowed.'}, status=405)



@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            # Load JSON data from the request body
            request_body = json.loads(request.body)
            username = request_body['username']
            password = request_body['password']

            # Check if username and password are provided
            if not (username and password):
                return JsonResponse({'error': 'Username and password are required.'}, status=400)

            # Check if the username already exists
            if UserProfile.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists.'}, status=400)

            # Create a new user
            user = UserProfile.objects.create_user(username=username, password=password)

            # Return a JSON response with the user's ID if successful
            return JsonResponse({'message': 'User registered successfully.', 'user_id': user.id}, status=201)

        except Exception as e:
            # Handle any exceptions
            print(e)
            return JsonResponse({'error': 'An error occurred.'}, status=500)

    # Return method not allowed for other HTTP methods
    return JsonResponse({'error': 'Method not allowed.'}, status=405)


@csrf_exempt  
def index(request):
    if request.method == 'POST':
        try:
            request_body = json.loads(request.body)
            code = request_body['code']
            user_id = request_body['id']  
            input_part = request_body['input']

            user = UserProfile.objects.get(id=user_id)

            error = None
            output = None


            print("request_body ===>", input_part)

            y = input_part

            input_part = input_part.replace("\n"," ").split(" ")

            def input():
                a = input_part[0]
                del input_part[0]
                return a

            if (user):

                original_stdout = sys.stdout
                sys.stdout = open('file.txt', 'w') #change the standard output to the file we created

                #execute code
                exec(code)  #example =>   print("hello world")

                sys.stdout.close()

                sys.stdout = original_stdout  #reset the standard output to its original value

                # finally read output from file and save in output variable
                output = open('file.txt', 'r').read()

                code_submission = CodeSubmission(user=user, code=code, compile_code=output, status='Executed' if output else 'Error')
                code_submission.save()
            
            else:
                 return JsonResponse({'error': 'User not found.'}, status=405)


        except SyntaxError as e:
            output = None
            error = f"Compilation error: {e}"
        except Exception as e:
            output = None
            error = f"Execution error: {e}"  # Capture more specific errors

        response_data = {
            'output': output,
            'error': error,
            'status': 'Executed' if output else 'Error'
        }

        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



@csrf_exempt
def submissions(request):
    if request.method == 'POST':
        try:
            # Load JSON data from the request body
            request_data = json.loads(request.body)
            user_id = request_data['id']

            # Retrieve user object
            user = UserProfile.objects.get(pk=user_id)

            # Retrieve previous code submissions for the user
            previous_submissions = CodeSubmission.objects.filter(user=user)

            # Serialize code submissions data
            previous_code = [{'code': submission.code, 'status': submission.status, 'compile_code': submission.compile_code} for submission in previous_submissions[::-1]]

            # Return previous code submissions data as JSON response
            return JsonResponse({'previous_code': previous_code}, status=200)

        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User does not exist.'}, status=404)
        except KeyError:
            return JsonResponse({'error': 'User ID not provided.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    # Return method not allowed for other HTTP methods
    return JsonResponse({'error': 'Method not allowed.'}, status=405)

