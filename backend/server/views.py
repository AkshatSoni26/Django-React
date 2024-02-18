from django.shortcuts import render

# Create your views here.
import io
import sys
import json
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


import io
import json
import sys
from django.http import JsonResponse

@csrf_exempt  # Carefully consider security implications before using this decorator
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
