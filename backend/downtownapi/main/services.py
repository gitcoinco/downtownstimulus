import sendgrid

from sendgrid.helpers.mail import *

sg = sendgrid.SendGridAPIClient("")
from_email = Email("dowtownstimulus@example.com", 'gitcoin.co')


def send_mail(_to_mail, subject, body):
    to_email = To(_to_mail)
    content = Content("text/html", body)
    mail = Mail(from_email, to_email, subject, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    print(response.status_code)
    print(response.body)
    print(response.headers)
