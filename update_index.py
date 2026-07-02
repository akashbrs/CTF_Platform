from CTFd import create_app
from CTFd.models import Pages, db
app = create_app()
with app.app_context():
    page = Pages.query.filter_by(route='index').first()
    if page:
        with open('homepage_light_theme_fixed.html', 'r', encoding='utf-8') as f:
            content = f.read()
        page.content = content
        db.session.commit()
        print('Updated index page in DB')
    else:
        print('Index page not found')
