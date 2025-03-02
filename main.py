from fastapi.staticfiles import StaticFiles
import uvicorn
from ServerPackages.api import APP
from ServerPackages.api.Routes import APICheckBin

app = APP()

app.ConnectNewAPIRoute(APICheckBin())

app.Mount('/', StaticFiles(directory='./templates', html=True), name='static')

app = app.App
    
# if (__name__ == "main"):
#     uvicorn.run("main:app.App", reload=True, reload_includes="*.css, *.html, *.js", reload_dirs=['card','','images'])