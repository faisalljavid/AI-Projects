# 🎯 Object Detection Web Application

A demo web-based object detection application that uses AI to identify and locate objects in images. Built with vanilla JavaScript and powered by Hugging Face Transformers.js.

![Object Detection Demo](https://img.shields.io/badge/Status-Demo-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![AI](https://img.shields.io/badge/AI-Transformers.js-blue)

## ✨ Features

- **🔍 Real-time Object Detection**: Detect multiple objects in uploaded images
- **🎨 Visual Bounding Boxes**: Color-coded bounding boxes with object labels and confidence scores
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Fast Processing**: Optimized for quick object detection using modern AI models
- **🎯 High Accuracy**: Uses DETR (DEtection TRansformer) model for precise object detection
- **🔄 Interactive UI**: Smooth animations and visual feedback for better user experience


## 🛠️ Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **AI Model**: Hugging Face Transformers.js
- **Object Detection Model**: DETR-ResNet-50 (Xenova/detr-resnet-50)
- **Build Tool**: Vite
- **Styling**: Custom CSS with modern animations

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** with JavaScript enabled

## 🏗️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd proj4-Object-Detector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🎮 How to Use

### Step 1: Upload an Image
- Click the "Choose File" button
- Select an image file (PNG, JPEG supported)
- The image will be displayed in the container

### Step 2: Detect Objects
- Once an image is uploaded, the "Detect Objects" button becomes active
- Click the button to start object detection
- Watch the loading animation as the AI processes your image

### Step 3: View Results
- Bounding boxes will appear around detected objects
- Each box shows the object label and confidence percentage
- Different colors are used for different object types

## 🔧 Configuration

### Model Settings
The detection threshold can be adjusted in `src/index.js`:

```javascript
const detectedObjects = await detector(image.src, {
    threshold: 0.8,  // Adjust confidence threshold (0.0 - 1.0)
    percentage: true, // Show results as percentages
});
```

### Supported Image Formats
- PNG (.png)
- JPEG (.jpg, .jpeg)

## 📁 Project Structure

```
proj4-Object-Detector/
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── index.js            # Main JavaScript logic
│   ├── App.css             # Styling and animations
│   └── images/             # Static images
└── README.md               # This file
```

## 🎨 Customization

### Styling
- Modify `src/App.css` to change the appearance
- Button colors, animations, and layout can be customized
- Bounding box colors are randomly generated for each detection

### Model
- Change the detection model by modifying the pipeline in `src/index.js`
- Here you can check different models: `https://huggingface.co/models?pipeline_tag=object-detection&library=transformers.js`
- Different models may have varying accuracy and speed

## 🔍 How It Works

1. **Image Upload**: User selects an image file through the file input
2. **Model Loading**: DETR-ResNet-50 model is loaded using Transformers.js
3. **Object Detection**: The model analyzes the image and identifies objects
4. **Bounding Box Generation**: For each detected object, a colored bounding box is created
5. **Visual Display**: Boxes are positioned and displayed with labels and confidence scores

## 🚀 Performance Tips

- **Image Size**: Larger images may take longer to process
- **Browser**: Use modern browsers for optimal performance
- **Network**: Ensure stable internet connection for model loading

## 🤝 Contributing

This is a demo project for learning purposes. Feel free to:
- Fork and experiment with the code
- Try different models and configurations
- Learn from the implementation

## 📝 License

This project is for educational/demo purposes. Please respect the licenses of the underlying libraries and models used.

## 🙏 Acknowledgments

- **Hugging Face** for providing the Transformers.js library
- **Xenova** for the DETR-ResNet-50 model
- **Vite** for the fast development build tool
- **Open source community** for the amazing tools and libraries

**Demo project showcasing AI-powered object detection with modern web technologies**
