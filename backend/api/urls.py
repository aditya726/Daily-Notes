from django.urls import path
from . import views


urlpatterns = [
    path('Notes/',views.NoteListCreate.as_view(),name = 'notes'),
    path('Notes/delete/<int:pk>',views.NoteDelete.as_view(),name = 'delete-notes'), 
]