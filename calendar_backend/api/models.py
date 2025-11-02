from django.db import models

# Create your models here.
class Event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    start = models.DateTimeField()
    end = models.DateTimeField()
    allDay = models.BooleanField(default=False)
    color = models.CharField(max_length=20, default='blue')
    day = models.IntegerField(default=1)

    def __str__(self):
        return self.title