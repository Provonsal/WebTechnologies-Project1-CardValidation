from fastapi.staticfiles import StaticFiles
import uvicorn
from ServerPackages.api import APP
from ServerPackages.api.Routes import APICheckBin

app = APP()

app.ConnectNewAPIRoute(APICheckBin())

app.Mount('/', StaticFiles(directory='./templates', html=True), name='static')

App = app.app
    
if (__name__ == "__main__"):
    uvicorn.run("main:app.app", reload=True, reload_includes="*.css, *.html, *.js", reload_dirs=['card','','images'])