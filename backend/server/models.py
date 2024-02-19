from django.db import models
from django.contrib.auth.hashers import make_password


class UserProfileManager(models.Manager):
    def create_user(self, username, password):
        # Ensure username is unique
        if self.filter(username=username).exists():
            raise ValueError('Username already exists.')

        # Create and save the user instance
        user = self.model(username=username, password=make_password(password))
        user.save(using=self._db)
        return user

class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)

    objects = UserProfileManager()

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
