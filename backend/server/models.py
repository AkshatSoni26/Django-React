from django.db import models

class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)

    def save(self, *args, **kwargs):
        # Ensure password is at least 4 characters long
        if len(self.password) < 4:
            raise ValueError("Password must be at least 4 characters long.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class CodeSubmission(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    code = models.TextField()
    compile_code = models.TextField()
    STATUS_CHOICES = [
        ('ERROR', 'Error'),
        ('SUCCESS', 'Success'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"Code submission by {self.user.username}"
