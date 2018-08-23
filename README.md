# Health Doc
###### Small self-contained utility to monitor your API endpoints and get alerts if they go down.

![alt text](https://i.gyazo.com/b19ce83210a629944bc5b37ed0057e0f.png "Preview")


### How to deploy it
```bash
docker run -d --name healthdoc jabravo/health-doc
```
By default it will expose port 80.

#### Different port
```bash
docker run -d -p 8085:80 -v /path/to/folder:/var/healthdoc -d --name healthdoc jabravo/health-doc
```
#### Storing the results
The results are stored inside the container in /var/healthdoc/data.db, adding a volume to the utility allows you to save it on the host.

```bash
docker run -d -p 8085:80 -v /path/to/folder:/var/healthdoc -d --name healthdoc jabravo/health-doc
```

This project is licensed under the terms of the MIT license.
