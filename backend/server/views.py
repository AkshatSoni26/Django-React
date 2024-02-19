# Create your views here.
import io
import sys
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


import io
import json
import sys
from django.http import JsonResponse
from django.contrib.auth.models import User





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
            user = User.objects.filter(username=username).first()

            if user is not None and user.check_password(password):
                # Username exists and password is correct
                return JsonResponse({'message': 'Login successful.', 'code': 200}, status=200)
            else:
                # Username does not exist or password is incorrect
                return JsonResponse({'error': 'Invalid username or password.', 'code': 200}, status=401)
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
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists.'}, status=400)

            # Create a new user
            user = User.objects.create_user(username=username, password=password)

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
            request_body = request.body
            code = json.loads(request_body)['code']

            # **Input Validation (add your validation logic here):**
            # - Validate the code for security
            # - Enforce length restrictions
            # - Blacklist dangerous keywords
            # - Apply other validation techniques as needed

            # Compile the code
            compiled_code = compile(code, '<string>', 'exec')

            # Execute the compiled code in a restricted environment (if available)
            # ...

            # Redirect stdout to a buffer
            stdout_buffer = io.StringIO()
            sys.stdout = stdout_buffer

            exec(compiled_code)

            output = stdout_buffer.getvalue()
            error = None

        except SyntaxError as e:
            output = None
            error = f"Compilation error: {e}"
        except Exception as e:
            output = None
            error = f"Execution error: {e}"  # Capture more specific errors
        finally:
            sys.stdout = sys.__stdout__

        response_data = {
            'output': output,
            'error': error,
            'status': 'Executed' if output else 'Error'
        }

        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
