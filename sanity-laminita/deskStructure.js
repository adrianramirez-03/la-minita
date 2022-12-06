// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Women')
        .child(
          S.list()
            // Sets a title for our new list
            .title('Women Categories')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Hats')
                .child(S.documentTypeList('womenHat').title('Hats')),
              S.listItem()
                .title('Shirts')
                .child(S.documentTypeList('womenShirt').title('Hats')),
              S.listItem()
                .title('Belts')
                .child(S.documentTypeList('womenBelt').title('Belts')),
              S.listItem()
                .title('Boots')
                .child(S.documentTypeList('womenBoot').title('Boots')),
            ])
        ),
      ,
      // We also need to remove the new singletons from the main list
      S.listItem()
        .title('Men')
        .child(
          S.list()
            // Sets a title for our new list
            .title('Men Categories')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Hats')
                .child(S.documentTypeList('menHat').title('Hats')),
              S.listItem()
                .title('Shirts')
                .child(S.documentTypeList('menShirt').title('Shirts')),
              S.listItem()
                .title('Belts')
                .child(S.documentTypeList('menBelt').title('Belts')),
              S.listItem()
                .title('Pants')
                .child(S.documentTypeList('menPant').title('Pants')),
              S.listItem()
                .title('Boots')
                .child(S.documentTypeList('menBoot').title('Boots')),
            ])
        ),
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'menHat',
            'menPant',
            'menShirt',
            'menBelt',
            'menBoot',
            'womenHat',
            'womenBelt',
            'womenShirt',
            'womenBoot',
          ].includes(listItem.getId())
      ),
    ]);
