__url='https://kivtech-devel.github.io/random_img_json/'
// updated url
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function make_style(img_url)
{
  //css to randomize 
// html {
//   background: #ecf0f1 url(img_url) no-repeat center center fixed;
//   background-size: cover;
// }

document.body.style.background = "#f3f3f3 url("+img_url+") no-repeat center center fixed";
document.body.style.background_size="contain";
    // document.getElementById('page_body').className="bg"+img_url;

}
function show_data(data)
{
  _rand=randomIntFromInterval(0,data.length-1);
  console.log(data[_rand]);
  _img=data[_rand];
  console.log(_img); //image data , now send to make style 
  make_style(_img)
  
}

fetch(__url+'img.json')
.then((response) => response.json())
.then((data) => {
  show_data(data.images)
});
