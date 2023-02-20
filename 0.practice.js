const { Model } = require('mongoose');
const { modelName } = require('./Model/user/userActivityModel');

nestedlistQuery;

// find Nested Obj
Model.findOne({
  userId: 'strong-more-strong',
  wishlists: {
    $elemMatch: {
      _id: 'topListId',
      'items._id': 'nestedID',
    },
  },
});

// created nestedObj
Model.findOneAndUpdate({
    userId:"strong",
    wishlists:{
        $elemMatch:{
            _id:"wishlistId",
            $expr:{
                $lt:[{$size:"$items"},16]
            }
        }
    }
},
{
    $push:{
       "wishlists.items":{
        
       } 
    }
})
// delete nestedObj
Model.findOneAndUpdate({
    userId:"strong",
    wishlists:{
        $elemMatch:{
            _id:"wishlistId",
           "items._id":"nestedID"
        }
    }
},
{
    $pull:{
       "wishlists.items":{
        _id:"nestedID"
       } 
    }
})