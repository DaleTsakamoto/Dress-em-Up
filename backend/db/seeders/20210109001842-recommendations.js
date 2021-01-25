'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Recommendations', [
      {
        name: 'Dress for Chloe',
        description: 'I hope Chloe has an awesome birthday.  She\'s going to love that dress.  That would be my #1 pick!',
        hyperlinks: 'https://www.express.com/clothing/women/free-the-roses-cheetah-pleated-mini-dress/pro/80005530/color/ANIMAL%20PRINT/,https://www.express.com/clothing/women/floral-twist-front-dress/pro/27920644/color/Multi/,https://www.lulus.com/products/rise-to-the-occasion-emerald-green-midi-wrap-dress/687311.html?s_kwcid=AL%217824%213%21482026039149%21%21%21g%21155659842323%21&gclid=CjwKCAiAouD_BRBIEiwALhJH6FvW6zOr8ws6WOdtBw6cTzDO5HlrWR3dl4LhkvN29_JTwQK_4sx3jBoCqdIQAvD_BwE,',
        apparelChoice: 'dress,other,pants,',
        userId: 1,
        designerId: 2,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dress Shirt for Charlie',
        description: 'Charlie seems like a really great guy.  Congrats on your 40th Anniversary!',
        hyperlinks: 'https://www.mizzenandmain.com/products/whitman-light-blue-gingham-spread-collar-dress-shirt-1?variant=31582027776075&gclid=CjwKCAiAouD_BRBIEiwALhJH6G2bHMU5L_vJWJ_xM65x2lV3b0XzfY4FL7G8Yxhy1ZzKnxJ0OWtduRoCZ6EQAvD_BwE,https://www.ctshirts.com/us/button-down-collar-soft-washed-non-iron-twill-shirt---dark-blue/CSN0256DBL.html?utm_term=CSN0253DBLXXXL7S&gclid=CjwKCAiAouD_BRBIEiwALhJH6PsZTc2YqrMHx0xit6hczD7Fbkbsto5foX8GDCnpn-8LaGgUHUmQphoC_i8QAvD_BwE&marketing=true&utm_campaign=USA-Shopping-A-Casual-Shirts&utm_medium=cpc&marketingCode=usot99&utm_source=google&utm_content=pla,https://www.etonshirts.com/en/product/navy-shirt-signature-twill?gclid=CjwKCAiAouD_BRBIEiwALhJH6Ix_kdqiA3jW3eC5i53QgOqEsSbFzEEg9rcPn8kBJPjJxa7c8CTohBoCoEgQAvD_BwE,',
        apparelChoice: 'shirt,pants,',
        userId: 4,
        designerId: 3,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Necklace and Bracelet for Anne',
        description: 'That jeweled bracelet and necklace will go well together and look stunning when paired with Anne\'s wardrobe',
        hyperlinks: 'https://www.valentino.com/en-US/bracelets_cod31432202864693108.html?tskay=&TP=160162&gclsrc=aw.ds&ds_rl=1277842&utm_campaign=8.+Valentino_Shopping_US&utm_source=GOOGLE&utm_medium=cpc&utm_content=All+Feed&utm_term=PRODUCT_GROUP&utm_country=US&utm_type=SEARCH&ds_rl=1277842&gclid=CjwKCAiAouD_BRBIEiwALhJH6PF_ne90KzLhCD0ZhjVzJLc8hSuseAcsGZK3daJ-HX1kFI4xggUR0BoCGbMQAvD_BwE&gclsrc=aw.ds,https://www.angara.com/p/oval-sapphire-and-diamond-pendant-sp0141s-n?stone_grade=aaaa&stone_size=4x3mm&metal_type=yellow+gold&metal_karat=14k&cid=ps-gpla-acc!SERUSA-adg!111319166539-dyn!SP0141S_N-YG-AAAA-4X3-pla-951724557987-cmp!11329523695&s_kwcid=AL!6785!3!472027892540!!!u!951724557987!!c&gclid=CjwKCAiAouD_BRBIEiwALhJH6E5G87GX8hrnwxIeRZb9btOfhQFFnfAqJxcqgO6lrM5Kt7_zdllAlhoC2xkQAvD_BwE,',
        apparelChoice: 'other,dress,shirt,',
        userId: 7,
        designerId: 3,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Coolest Pants in the World',
        description: 'Wow, Marquise\'s style is so unique and amazing!  He\'s going to love these pants which he can wear informally and out at night',
        hyperlinks: 'https://hreski.com/shop/golf-pants/abstract-purple-lines-golf-pants-hreski-127/?gclid=CjwKCAiAouD_BRBIEiwALhJH6NHr2-5DsOZafQRhJBzDU0fJJYCL_s8NmKGG3EUuwYIcSZhYZhkj4hoCr1AQAvD_BwE,https://bonobos.com/products/lightweight-travel-jeans?color=pink%20sand&utm_medium=ppc&utm_source=google&utm_campaign=00_G-Shopping_US_NB_%7c_Pants_Jeans_%7c_DSK_TBL&utm_content=11375102844_116738842492&gclsrc=aw.ds&&gclid=CjwKCAiAouD_BRBIEiwALhJH6IGykNE2jID78DKWQP8dLQ4oHAOHwDxCO4sz0zICtNGjTRLVEUyjCxoCB5cQAvD_BwE&gclsrc=aw.ds,',
        apparelChoice: 'pants,',
        userId: 1,
        designerId: 5,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Party Time on the West Side',
        description: 'Looking for party clothes for your bestie Zelda.  She\'s going to have a blast with this wardrobe',
        hyperlinks: 'https://www.lulus.com/products/bottle-service-black-strapless-peplum-top/828962.html?utm_source=google&utm_medium=cpc&utm_campaign=PLA_Overstocks&utm_term=T1111%3A%20BLACK1&utm_content=72567633336_482624608796&s_kwcid=AL%217824%213%21482624608796%21%21%21g%21883486487246%21&gclid=CjwKCAiAouD_BRBIEiwALhJH6ORv4j-Td2YrLwS0dKzVyt0gS9ub2_k0lS6SWogg75M34KBWpwd7qBoCVY4QAvD_BwE,https://www.lucyinthesky.com/shop/love-affair-velvet-dress-in-hunter-green?usd&network=g&device=c&keyword=&campaign=%2A%2ALP+-+Shop+-+NonTM+-+Party+Dresses&adgroup=pla-296076505849&gclid=CjwKCAiAouD_BRBIEiwALhJH6LDnGB2jJXFoJRXTe1Aynk8rWXtOEwgBZombGTWUQCsHRxkovN-z7xoChZQQAvD_BwE,https://www.southmoonunder.com/shop/p/primadonna-top-59300?CATARGETID=120166000000858894&CADevice=c&gclid=CjwKCAiAouD_BRBIEiwALhJH6C1DsPeFqvevKTqaMdareWsAwYkdJpwjv7bjx2HHLXWFDSSB5raHcBoCUrMQAvD_BwE,',
        apparelChoice: 'dress,pants,other,',
        userId: 1,
        designerId: 11,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothing for Derek\'s mom',
        description: 'Your mom sounds like an amazing woman.  After a 5 year battle with cancer she\'s in remission and deserves the best gift!',
        hyperlinks: 'https://www.vicicollection.com/products/anne-smocked-velvet-polka-dot-blouse?variant=32626778406974&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic,https://www.nordstromrack.com/s/n3311850?color=PINK&utm_source=google&utm_medium=cpc&utm_campaign=PLA_Shopping_Women_Generic&utm_channel=LOW_ND_SHOP&sid=545650&creative=466031780058&device=c&network=g&acctid=21700000001756534&dskeywordid=92700057050042164&lid=92700057050042164&ds_s_kwgid=58700006318553891&ds_s_inventory_feed_id=97700000012930068&dsproductgroupid=297046111409&product_id=19794352&merchid=100921846&prodctry=US&prodlang=en&channel=online&locationid=9032025&targetid=pla-297046111409&campaignid=11039513930&adgroupid=103501928610&gclid=CjwKCAiAouD_BRBIEiwALhJH6IvM_aG7EqN3aHKFgdnhaNxGahuYI_4BoDrXmuaZVvgj-LX7mgxAhhoCj2wQAvD_BwE&gclsrc=aw.ds,https://www.betabrand.com/skinny-leg-cigarette-dress-pant-yoga-pants-catstooth?g_network=g&g_acctid=603-535-1774&g_adid=448103347397&g_keyword=&g_adtype=pla&g_keywordid=pla-293946777986&g_ifcreative=&g_campaign=Shopping%20%3E%20General&g_adgroupid=107026483871&g_productid=34848&g_merchantid=7111949&g_partition=293946777986&g_campaignid=10530870697&g_productchannel=online&g_ifproduct=product&gclid=CjwKCAiAouD_BRBIEiwALhJH6Or4sqkmNJtr-sevXdxDaKrS5wm4uDEGIA0MlWX8p-t2PKDIm1F9uhoC5HsQAvD_BwE,',
        apparelChoice: 'pants,shirt,',
        userId: 10,
        designerId: 2,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pickin the Creme of the Crop for Caleb',
        description: 'Happy 13th anniversary!  Caleb sounds like a great father and boyfriend.',
        hyperlinks: 'https://overhalfsale.com/products/mens-casual-patchwork-short-sleeve-shirt?utm_medium=cpc&utm_source=google&utm_campaign=Google%20Shopping&variant=13672424931383,https://www.saksfifthavenue.com/product/givenchy-glitch-logo-regular-fit-t-shirt-0400012766484.html?site_refer=NPLA_GGL_Shopping&country=US&currency=USD,https://www.neimanmarcus.com/p/versace-mens-beaded-medusa-t-shirt-prod226550047?ecid=NMCS__GooglePLA&utm_source=google_shopping,',
        apparelChoice: 'shirt,pants,outerwear,',
        userId: 9,
        designerId: 2,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'A Dress that will Make your Daughter Smile',
        description: 'Sonia is an amazing daughter who loves you very much.  I\'m so happy you are getting the best gift possible for her!',
        hyperlinks: 'https://www.nordstrom.com/s/all-in-favor-simone-floral-wrap-front-minidress/5792671?origin=keywordsearch-personalizedsort&breadcrumb=Home%2FAll%20Results&color=300,https://www.nordstrom.com/s/rachel-parcell-embroidered-tiered-mesh-dress-nordstrom-exclusive/5334777?origin=keywordsearch-personalizedsort&breadcrumb=Home%2FAll%20Results&color=001,',
        apparelChoice: 'dress,',
        userId: 4,
        designerId: 11,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Julio is going to love any of these sports coats',
        description: 'Tell Julio, congrats on his promotion.  He\'s a hard worker and deserves it, and he\'s lucky to have a husband like you!',
        hyperlinks: 'https://bonobos.com/products/unconstructed-italian-wool-blazer?color=rowan%20brown%20plaid&utm_medium=ppc&utm_source=google&utm_campaign=00_G-Shopping_US_NB_%7c_Suiting_%7c_DSK_TBL&utm_content=11375102856_116738850372&gclsrc=aw.ds&&gclid=CjwKCAiAouD_BRBIEiwALhJH6H04LXusCC_rAAXXPpBo45Vo46HJseBSsgF3sPEhx41pB7tjGNWnbxoC7wQQAvD_BwE&gclsrc=aw.ds,https://www.menswearhouse.com/p/joseph-abboud-blue-tic-modern-fit-sport-coat-14MD14ME70?channel=PLA&brand=TMW&source=google&medium=cpc&campaign=9762963016&adgroup_id=102766476234&keyword=pla-307253498149&content=TMW/MW40_14MD_70_JOSEPH_ABBOUD_BLUE_TIC_MAIN&match_type=&ad_id=428719848907&category=Apparel%20%26%20Accessories%7cClothing%7cOuterwear%7cCoats%20%26%20Jackets&custom_label=Joseph%20Abboud%7cSport%20Coats%7cNon-Clearance%7cregular%7cSport%20Coats%20159&CAWELAID=120259610001170134&CAGPSPN=pla&CAAGID=102766476234&CATCI=pla-307253498149&CATARGETID=120259610001188382&CADevice=c&gclid=CjwKCAiAouD_BRBIEiwALhJH6Jw2YnHyFZ1akAaCw8C6NVTT8sZIbW1A1NSHZjYvPj-PmcQoYKo-JhoCwsYQAvD_BwE,https://www.vince.com/on/demandware.store/Sites-vince-Site/default/Product-Variation?pid=M63774745&dwvar_M63774745_color=001BLK&glCountry=US&glCurrency=USD&cat=google_shopping&gclid=CjwKCAiAouD_BRBIEiwALhJH6Gxg3iOoNOmjqUG6cwGo-UUuwlA6mlydf-BaLx-QssciTmFTz1khihoCOr0QAvD_BwE,',
        apparelChoice: 'outerwear,',
        userId: 9,
        designerId: 5,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Congratulations, Rain on your Graduation!',
        description: 'Rain is such a hard worker and amazing student.  She is going to be a strong and independent woman!',
        hyperlinks: 'https://www.llbean.com/llb/shop/512154?originalProduct=56772&productId=1030995&attrValue_0=Light%20Gray%20Heather&pla1=0&mr%3AtrackingCode=85663E5E-9037-E611-80EE-00505694403D&mr%3AreferralID=NA&mr%3Adevice=c&mr%3AadType=plaonline&qs=3125157&gclid=CjwKCAiAouD_BRBIEiwALhJH6FajbNzp_pvQM5-gyxGY6MOlQ6Ynqy8jmTUVSGmKFuLyLjp1mOWdIRoCPRMQAvD_BwE&gclsrc=aw.ds&SN=MasterPrompt04_test&SS=B&SN2=FindabilityRecs05_test&SS2=A&SN3=FindabilityProd07_Cat&SS3=B,https://www.chicwish.com/prairie-check-rabato-coat-by-chic.html?gclid=CjwKCAiAouD_BRBIEiwALhJH6POR3lAzoAkXoVuMDtHGS9MS4Cb2MSOmBSnGiZUqqyK93Yv0JJf_9hoCITUQAvD_BwE,',
        apparelChoice: 'outerwear,',
        userId: 9,
        designerId: 8,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'George is going to love this Festivus Pole!',
        description: 'This pole is lacking in all color and reflection which should be great for George!  Have a happy, amazing Festivus!',
        hyperlinks: 'https://www.uglychristmassweater.com/product/seinfeld-festivus-for-the-rest-of-us-pole-sweater/?attribute_pa_sweater-size=large,https://toywiz.com/neca-seinfeld-festivus-desktop-pole-greeting-cards-9-inch/,https://www.teepublic.com/t-shirt/146001-festivus-theres-a-pole?utm_source=paid_search&utm_medium=ppc&utm_campaign=PLA&utm_content=t-shirt-child-1&feed_sku=146001D1V19G79A23C24S,',
        apparelChoice: 'shirt,outerwear,other,',
        userId: 6,
        designerId: 8,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Glen is bringin the house down this weekend!',
        description: 'Dress like a pro, you go Glen Coco!',
        hyperlinks: 'https://www.publicrec.com/products/all-day-every-day-pant/?utm_source=podcast&utm_medium=audio&utm_campaign=drdrew,https://www.rhone.com/products/commuter-pant-skinny?variant=32643616833639&g_product_type=Pants&g_acctid=942-640-4075&g_campaign=A%20%7C%20Prospecting%20%7C%20Shopping&g_campaignid=10833388741&g_adgroupid=114816717995&g_adid=483340664857&g_keyword=&g_keywordid=pla-523482853086&g_adtype=pla&g_merchantid=101165829&g_productchannel=online&g_productid=shopify_US_4647789953127_32643616833639&g_partition=523482853086&g_network=g&g_ifproduct=product&g_ifcreative=&gclid=CjwKCAiAouD_BRBIEiwALhJH6Ked5b2XKdoRa-GEGJpHnASCVh1ZR-Nypa-yxve2pXHQJIEYtPjm7RoC1mEQAvD_BwE,https://www.kohls.com/product/prd-4226452/mens-mean-girls-you-go-glen-coco-fleece.jsp?skuid=61496127&CID=shopping15&utm_campaign=LICENSED/NOVELTY&utm_medium=CSE&utm_source=google&utm_product=61496127&utm_campaignid=9733267372&gclid=CjwKCAiAouD_BRBIEiwALhJH6Dia0luz13ofXfcZoDcdO6quV4ESeYQHFDzurYGkBXwy76S_kHOI3xoCN2MQAvD_BwE&gclsrc=aw.ds,',
        apparelChoice: 'outerwear,pants,',
        userId: 4,
        designerId: 5,
        requestId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recommendations', {});
  }
};