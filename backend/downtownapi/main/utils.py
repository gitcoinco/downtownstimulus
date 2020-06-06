from django.template.loader import render_to_string
import premailer


def premailer_transform(html):
    p = premailer.Premailer(html, base_url='http://127.0.0.1:8000/')
    return p.transform()


def get_mail_body(mail_name, mail_params):
    response_html = premailer_transform(render_to_string("emails/" + mail_name + ".html", mail_params))
    return response_html
