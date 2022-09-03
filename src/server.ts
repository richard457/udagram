import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  // Root Endpoint
  // Displays a simple message to the user
  app.get("/filteredimage", async (req, res) => {
    // validate the url is passed with ending as image eg. /image.png, jpg
    let desired = req.query.image_url;
    if (desired != undefined) {
      if (desired.endsWith('.jpg') || desired.endsWith('.png')) {
        let filtered = await filterImageFromURL(req.query.image_url);
        res.sendFile(filtered);
        // res.send(req.query.image_url);
      }else{
        res.send("We need valid URL with PNG or JPG file provided");
      }
      
    } else {
      res.send("please provide url: /filteredimage?image_url={{URL}}");
    }
  });

  app.get("/", async (req, res) => {
    res.send("please provide url: /filteredimage?image_url={{URL}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();