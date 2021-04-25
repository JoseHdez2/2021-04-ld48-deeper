export const createStrokeText = ({thiz, x, y, text, style, stroke}: 
  {thiz: Phaser.Scene, x: number, y: number, text: string, style: any, stroke: any}) : Phaser.GameObjects.Text => {
    let textGameObj = thiz.add.text(x, y, text, style);
    if(stroke){
      textGameObj.setStroke(stroke.color || "black", stroke.size || 1);
    }
    return textGameObj;
  };
  
  export const createText = ({thiz, x, y, text, style, stroke}) => {
    var text = thiz.add.text(x, y, text, style);
    if(stroke){
      text.setStroke(stroke.color || "black", stroke.size || 0);
    }
    return text;
    // {
    //   fontFamily: "Arial Black",
    //   fontSize: 74,
    //   color: "#c51b7d"
    // });
  }