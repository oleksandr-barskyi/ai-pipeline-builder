@echo off
start "VectorShift Backend" cmd /k "cd /d %~dp0backend && uvicorn main:app --reload --port 8000"
start "VectorShift Frontend" cmd /k "cd /d %~dp0frontend && npm start"
