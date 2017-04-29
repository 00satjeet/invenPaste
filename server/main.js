import { Meteor } from 'meteor/meteor';
import '../imports/api/users';
import '../imports/api/productos';
import '../imports/api/proveedores';

import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // code to run on server at startup
});
