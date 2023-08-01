export class Controller {
  testAPI = async (ctx) => {
    //change to env var
    fetch("https://www.googleapis.com/books/v1/volumes?q=i+love+you+like+no+otter&key=AIzaSyCXXFBqGjhmj3-XVhiNi6r60Zalz8ViOuI")
      .then(function(ctx) {
        return ctx.response.json();
      })
      .then(function(result) {
        title = result.items[0].volumeInfo.title;
        description = result.items[0].volumeInfo.description;
        console.log(title);
        console.log(description);
      }),
      function(error) {
        console.log(error);
      };
  };
}