import re
from CTFd import create_app
from CTFd.models import Pages, db
app = create_app()
with app.app_context():
    page = Pages.query.filter_by(route='index').first()
    if page:
        new_content = re.sub(r'<div class="text-center mt-5 pt-5 pb-2">.*?BlindSpot CTF by Malla Reddy University.*?Inspired by CTFd.*?</div>', '', page.content, flags=re.DOTALL)
        new_content = re.sub(r'<!-- Footer Section -->\s*', '', new_content)
        if new_content != page.content:
            page.content = new_content
            db.session.commit()
            print('Successfully removed the footer from the index page.')
        else:
            print('Could not match the footer regex.')
