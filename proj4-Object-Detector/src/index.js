import { pipeline } from '@huggingface/transformers';

const status = document.getElementById("status");
const image = document.getElementById("image");
const detectObjectsButton = document.getElementById('detect-objects')
const imageContainer = document.getElementById('image-container')
const input = document.querySelector('#img-file')

// Initially disable the detect button since no image is loaded
detectObjectsButton.disabled = true;

input.addEventListener('change', (e) => {
    if (e.target.files[0]) {
        image.src = URL.createObjectURL(e.target.files[0])

        // Clear any existing bounding boxes
        if (imageContainer.children.length > 1) {
            const children = imageContainer.querySelectorAll('.bounding-box')
            children.forEach(el => imageContainer.removeChild(el))
        }

        // Enable the detect button when an image is uploaded
        detectObjectsButton.disabled = false;
        status.textContent = "Image uploaded. Ready to detect objects.";
    }
})

status.textContent = "Loading model...";
const detector = await pipeline("object-detection", "Xenova/detr-resnet-50");


detectObjectsButton.addEventListener("click", detectAndDrawObjects);
status.textContent = "Model loaded. Please upload an image to start.";

// Load model and create a new object detection pipeline

async function detectAndDrawObjects() {
    // Add loading state to button
    detectObjectsButton.classList.add('loading');
    detectObjectsButton.disabled = true;
    detectObjectsButton.textContent = 'Detecting...';

    status.textContent = "Detecting Objects...";
    const detectedObjet = await detector(image.src, {
        threshold: 0.8,
        percentage: true,
    });

    status.textContent = 'Drawing...'
    detectedObjet.forEach((object) => {
        drawObjectBox(object)
    });

    // Remove loading state from button
    detectObjectsButton.classList.remove('loading');
    detectObjectsButton.disabled = false;
    detectObjectsButton.textContent = 'Detect Objects';

    status.textContent = "Done!";
}

function drawObjectBox(detectedObject) {
    const { label, score, box } = detectedObject
    const { xmax, xmin, ymax, ymin } = box

    // Generate a random color for the box
    const color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0)

    // Draw the box
    const boxElement = document.createElement('div')
    boxElement.className = 'bounding-box'
    Object.assign(boxElement.style, {
        borderColor: color,
        left: 100 * xmin + '%',
        top: 100 * ymin + '%',
        width: 100 * (xmax - xmin) + '%',
        height: 100 * (ymax - ymin) + '%',
    })

    // Draw label
    const labelElement = document.createElement('span')
    labelElement.textContent = `${label}: ${Math.floor(score * 100)}%`
    labelElement.className = 'bounding-box-label'
    labelElement.style.backgroundColor = color

    boxElement.appendChild(labelElement)
    imageContainer.appendChild(boxElement)
}