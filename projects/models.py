from django.db import models

from users.models import User


class Project(models.Model):

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    created_by = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        related_name='created_projects'
    )

    members = models.ManyToManyField(

        User,

        related_name='projects',

        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.title