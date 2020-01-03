from django.template import Library
 
register = Library()
 
@register.filter
def addclass(field, class_name):
    return field.as_widget(attrs={
        "class": " ".join((field.css_classes(), class_name))
    })
    
register.filter('addclass', addclass)