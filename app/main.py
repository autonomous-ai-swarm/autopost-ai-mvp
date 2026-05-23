from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai

# Placeholder API key – replace with your actual key
openai.api_key = "sk-PLACEHOLDER"

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

class PostResponse(BaseModel):
    post: str

@app.post("/generate", response_model=PostResponse)
async def generate(request: PromptRequest):
    try:
        # Call OpenAI GPT-4o-mini model
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": request.prompt}],
            max_tokens=500,
        )
        # Extract the generated content
        generated = response.choices[0].message.content.strip()
        return {"post": generated}
    except openai.error.OpenAIError as e:
        raise HTTPException(status_code=502, detail=f"OpenAI API error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
