import json
import google.generativeai as genai
import os

def handler(event, context):
    # Wannan zai dauko key din daga Netlify Settings
    api_key = api_key = "AIzaSyAi6IR674TJEerKVWdqVOdqFmHTADjWlsg"
    
    if not api_key:
        return {"statusCode": 500, "body": json.dumps({"error": "API Key is missing in Netlify settings"})}

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')
