import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './product';
import banner from './banner';

import womenBelt from './women/womenBelt';
import womenBoot from './women/womenBoot';
import womenHat from './women/womenHat';
import womenShirt from './women/womenShirt';
import womenPant from './women/womenPant';

import menHat from './men/menHat';
import menBelt from './men/menBelt';
import menShirt from './men/menShirt';
import menBoot from './men/menBoot';
import menPant from './men/menPant';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    womenBelt,
    womenBoot,
    womenHat,
    womenShirt,
    womenPant,
    menHat,
    menShirt,
    menPant,
    menBelt,
    menBoot,
    banner,
  ]),
});
