import json
import google.generativeai as genai
import os

def handler(event, context):
    # Saka API Key dinka anan
    api_key = "AIzaSyAi6IR674TJEerKVWdqVOdqFmHTADjWlsg"
    
    if not api_key:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "API Key is missing"})
        }

    try:
        # Saita Gemini
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-pro')

        # Karbar sako daga website din
        data = json.loads(event.get("body", "{}"))
        user_message = data.get("message", "Sannu")

        # Neman amsa daga Gemini
        response = model.generate_content(user_message)
        ai_response = response.text

        return {
            "statusCode": 200,
            "body": json.dumps({"reply": ai_response})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
