import { InferenceClient } from '@huggingface/inference'
import image from "./images/old-photo.jpeg"
import blobToBase64 from './utils'

const hf = new InferenceClient(import.meta.env.VITE_HUGGING_FACE_API_KEY)

const textToGenerate = "The definition of machine learning inference is? Give answer in less than 100 words"

const textToClassify = "I just bought a new camera. It's the best camera I've ever owned!"

const textToTranslate = "It's an exciting time to be an AI engineer"

const text = "It is an exciting time to be an A.I. engineer, I mean look at the possibilities"


// // Text Generation/Chat completion

// const response1 = await hf.chatCompletion({
//     model: "mistralai/Mistral-Nemo-Instruct-2407",
//     messages: [
//         {
//             role: "user",
//             content: textToGenerate
//         }
//     ]

// })

// console.log(response1.choices[0].message.content);



// // Text Classification

// const response2 = await hf.textClassification({
//     model: 'SamLowe/roberta-base-go_emotions',
//     inputs: textToClassify
// })

// console.log(response2[0].label);




// // Text Translation
// const response3 = await hf.translation({
//     model: 'facebook/mbart-large-50-many-to-many-mmt',
//     inputs: textToTranslate,
//     parameters: {
//         src_lang: "en_XX",
//         tgt_lang: "ar_AR"
//     }
// })

// console.log(`Translation: ${response3.translation_text}`)



// // Text-to-Speech  (credit problem)

// const response4 = await hf.textToSpeech({
//     inputs: text,
//     model: "canopylabs/orpheus-3b-0.1-ft"

// })

// const audioElement = document.getElementById("speech")
// const speechURL = URL.createObjectURL(response4)
// audioElement.src = speechURL




// // Image to Image

// const model = "ghoskno/Color-Canny-Controlnet-model"

// const oldImageUrl = image
// const oldImageResponse = await fetch(oldImageUrl)
// const oldImageBlob = await oldImageResponse.blob()

// const prompt = `An elderly couple walks together on a gravel path with green 
// grass and trees on each side. Wearing neutral-colored clothes, they face away
// from the camera as they carry their bags.`

// const newImageBlob = await hf.imageToImage({
//     model: model,
//     inputs: oldImageBlob,
//     parameters: {
//         prompt: prompt,
//         negative_prompt: "Black and white photo. text, bad anatomy, blurry, low quality",
//         // Between 0 and 1
//         strength: 0.85,
//     }
// })

// const newImageBase64 = await blobToBase64(newImageBlob)
// const newImage = document.getElementById("new-image")
// newImage.src = newImageBase64