import sys
import json
import os
try:
    from paddleocr import PaddleOCR
except ImportError:
    print(json.dumps({"error": "PaddleOCR not installed. Please run: pip install paddlepaddle paddleocr opencv-python"}))
    sys.exit(1)

import logging

# Suppress PaddleOCR logs
logging.getLogger("ppocr").setLevel(logging.ERROR)

def process_receipt(image_path):
    # Initialize PaddleOCR with Turkish support
    try:
        # Try both ways to be safe across versions
        try:
            ocr = PaddleOCR(use_angle_cls=True, lang='tr', show_log=False)
        except TypeError:
            ocr = PaddleOCR(use_angle_cls=True, lang='tr')
    
    except Exception as e:
        return {"status": "error", "message": f"Initialization failed: {str(e)}"}
    
    try:
        result = ocr.ocr(image_path)
        
        # Flatten and format the result
        # result is a list of lists: [[ [box, (text, confidence)], ... ]]
        output = []
        if result and result[0]:
            for line in result[0]:
                box = line[0] # [[x,y], [x,y], [x,y], [x,y]]
                text = line[1][0]
                confidence = float(line[1][1])
                
                output.append({
                    "box": box,
                    "text": text,
                    "confidence": confidence
                })
        
        return {"status": "success", "data": output}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
        
    image_path = sys.argv[1]
    if not os.path.exists(image_path):
        print(json.dumps({"error": "Image file not found"}))
        sys.exit(1)
        
    res = process_receipt(image_path)
    print(json.dumps(res))
