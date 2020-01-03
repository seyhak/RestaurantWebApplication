from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.urls import reverse
from django.core import exceptions
from django.views.generic.base import TemplateView
from django.contrib import sessions
from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.

class MainView(TemplateView):
    template_name = 'home.html'
    
    # sends context data to html. It has to be "get_context_data"
    def get_context_data(self, **kwargs):
        context = super(MainView, self).get_context_data(**kwargs)
        context.update({
            'var1': self.kwargs.get('var1', "sda"),
            #'var2': self.kwargs.get('var2', None),
        })
        return context
    