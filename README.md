# kingoloto-app-client

[![Greenkeeper badge](https://badges.greenkeeper.io/rem42/kingoloto-app-client.svg)](https://greenkeeper.io/)

A client for kingoloto app using node

[![npm](https://img.shields.io/npm/v/kingoloto-app-client.svg)](https://www.npmjs.com/package/kingoloto-app-client)
[![npm](https://img.shields.io/npm/dt/kingoloto-app-client.svg)](https://www.npmjs.com/package/kingoloto-app-client)
[![install size](https://packagephobia.now.sh/badge?p=kingoloto-app-client)](https://packagephobia.now.sh/result?p=kingoloto-app-client)
[![Greenkeeper badge](https://badges.greenkeeper.io/rem42/kingoloto-app-client.svg)](https://greenkeeper.io/)

## Installation 
```sh
npm install kingoloto-app-client --save
```
## Usage
### TypeScript

```typescript
import {Kingoloto} from "kingoloto-app-client";

Kingoloto.init('email@email.com', 'password')
.then((client: Kingoloto) => {
    // code
});
```
