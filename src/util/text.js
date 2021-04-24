export const createStrokeText = ({thiz, x, y, text, style, stroke}) => {
  console.log(thiz);
  var text4 = thiz.add.text(x, y, text, style);
  if(stroke){
    text4.setStroke(stroke.color || "black", stroke.size || 1);
  }
  // text4.setStroke("#de77ae", 16);
};

export const createText = ({thiz, x, y, text, style, stroke}) => {
  var text = thiz.add.text(x, y, text, style);
  if(stroke){
    text.setStroke(stroke.color || "black", stroke.size || 0);
  }
  // {
  //   fontFamily: "Arial Black",
  //   fontSize: 74,
  //   color: "#c51b7d"
  // });
}