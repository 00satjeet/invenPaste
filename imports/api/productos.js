import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Productos=new Mongo.Collection('productos');

if(Meteor.isServer){
  Meteor.publish('productos', function(){
    return Productos.find({userId:this.userId});
  });
}

Meteor.methods({
  'productos.insert'(nombreProducto,marca,nombreProveedor,unidadesXCaja,cantidadUnitaria,
    cantidadCajas,precioUnitario,precioXCaja,esPrecioAproximado,esEnCaja){
    console.log('datos a grabar de Productos: ',nombreProducto,marca,nombreProveedor,unidadesXCaja,
    cantidadUnitaria,cantidadCajas,precioUnitario,precioXCaja,esPrecioAproximado,esEnCaja);
       console.log("tipo de caja :::  "+typeof precioXCaja);

    if(!this.userId){
      throw new Meteor.Error('Usuario no autorizado');
    }
    // if(!precioXCaja){
    //   precioXcaja=parseInt(0);
    //   console.log("truco para evitar el error undefined, en las variables vacias"+precioXCaja);
    // }
    // if (typeof precioXcaja === "string") {
    //    this.precioXcaja = 0;
    //    console.log("precioXCaja:::  "+this.precioXCaja);
    //  }
    new SimpleSchema({
      nombreProducto:{
        type:String,
        label:'Nombre del Producto',
      },
      marca:{
        type:String,
        label:'Marca del Producto',
        optional: true,
      },
      nombreProveedor:{
        type:String,
        label:'Nombre del Proveedor',
        optional: true,
      },
      unidadesXCaja:{
        type:Number,
        label:'Cantidad de unidades por caja',
        optional: true,
      },
      cantidadUnitaria:{
        type:Number,
        label:'Cantidad de unidades sueltas',
        optional: true,
      },
       cantidadCajas:{
          type:Number,
          label:'Cantidad de cajas completas',
          optional: true,
        },
        precioUnitario:{
           type:Number,
           label:'Precio Unitario',
           optional: true,
         },
         precioXCaja:{
            type: Number,
            label:'Precio por una caja de productos',
            optional: true,
            // custom: function () {
            //   if (this.value == string || null||'') {
            //     this.value=0;
            //     return this.value=0;
            //
            //   }
            // }


          },
          esPrecioAproximado:{
             type:Boolean,
             label:'El precio varia siempre',
             optional: true,
           },
           esEnCaja:{
              type:Boolean,
              label:'Verdad si es en caja, falso si se compra unitario',
              optional: true,
            },


    }).validate({nombreProducto,marca,nombreProveedor,unidadesXCaja,cantidadUnitaria,
          cantidadCajas,precioUnitario,precioXCaja,esPrecioAproximado,esEnCaja});

    var inventarioInicialTemp=(unidadesXCaja *cantidadCajas )+cantidadUnitaria;
    Productos.insert({
      nombreProducto:nombreProducto,
      userId:this.userId,
      marca:marca,
      nombreProveedor:nombreProveedor,
      unidadesXCaja:unidadesXCaja,
      visible:true,
      cantidadUnitaria:cantidadUnitaria,
      cantidadCajas:cantidadCajas,
      inventarioInicial:inventarioInicialTemp,
      inventarioFinal:inventarioInicialTemp,
      cantidadUnitariaPedido:0,
      precioUnitario:precioUnitario,
      precioXCaja:precioXCaja,
      esPrecioAproximado:esPrecioAproximado,
      esEnCaja:esEnCaja,
      modifiedAt:new Date()

    });

  },
    // 'productos.ingresoInventario'(_id,cantidadUnitaria,cantidadCajas){
    //   if(!this.userId){
    //      throw new Meteor.Error('Usuario no autorizado');
    //    }
    //    new SimpleSchema({
    //
    //      cantidadUnitaria:{
    //        type:Number,
    //        label:'Cantidad de unidades sueltas',
    //        optional: true,
    //      },
    //      cantidadCajas:{
    //        type:Number,
    //        label:'Cantidad de Cajas',
    //        optional: true,
    //
    //      },
    //     //  precioBrutoUnitario:{
    //     //    type:Number,
    //     //    label:'Cantidad de Cajas',
    //     //    optional: true,
    //      //
    //     //  },
    //      fecha:{
    //        type:Date,
    //        label:'Cantidad de Cajas',
    //      },
    //    }).validate({cantidadUnitaria,cantidadCajas});
    //
    //    Productos.update({
    //        _id,
    //        userId:this.userId
    //      },{
    //        $set:{
    //          cantidadUnitaria,
    //          cantidadCajas
    //        }
    //      });
    // },
    'productos.updateInventario'(_id,cantidadUnitaria,cantidadCajas,unidadesXCaja){
      if(!this.userId){
         throw new Meteor.Error('Usuario no autorizado');
       }
       new SimpleSchema({

         cantidadUnitaria:{
           type:Number,
           label:'Cantidad de unidades sueltas',
           optional: true,

         },
         cantidadCajas:{
           type:Number,
           label:'Cantidad de Cajassss',
           optional: true,

         },
         //
        //  fecha:{
        //    type:Date,
        //    label:'Cantidad de Cajas',
        //  },
       }).validate({cantidadUnitaria,cantidadCajas});

       Productos.update({
           _id,
           userId:this.userId
         },{
           $set:{
             cantidadUnitaria,
             cantidadCajas
           }
         });
         if(Productos.findOne({_id}).modifiedAt< new Date()){
           var inventarioFinalTemp=(unidadesXCaja *cantidadCajas )+cantidadUnitaria;
           Productos.update({
               _id,
               userId:this.userId
             },{
               $set:{
                 cantidadUnitaria,
                 cantidadCajas,
                 inventarioFinal:inventarioFinalTemp,
               }
             });
         }
         console.log("Hola");
         console.log("la id ", _id);
         console.log("cantidad unitaria "+ cantidadUnitaria);


         console.log(Productos.find({_id}).fetch());
         console.log("fecha anterior",Productos.findOne({_id}).modifiedAt);
         console.log("fecha actual",new Date());

        //  if(Productos.find({_id}).)
    },

    'productos.updatePedido'(_id,cantidadUnitariaPedido){
      if(!this.userId){
         throw new Meteor.Error('Usuario no autorizado');
       }
       new SimpleSchema({

         cantidadUnitariaPedido:{
           type:Number,
           label:'Cantidad de unidades del pedido',
           optional: true,

         },

       }).validate({cantidadUnitariaPedido});
       if(Productos.findOne({_id}).modifiedAt < new Date() ){
         console.log("la fecha actual es mayor, actualizo en inventario inicial")
         Productos.update({
             _id,
             userId:this.userId
           },{
             $set:{
               cantidadUnitariaPedido,
               modifiedAt:new Date(),
               inventarioInicial:Productos.findOne({_id}).inventarioFinal+cantidadUnitariaPedido
             }
           });
       }else{
         Productos.update({
             _id,
             userId:this.userId
           },{
             $set:{
               cantidadUnitariaPedido
             }
           });
       }
      //  Productos.update({
      //      _id,
      //      userId:this.userId
      //    },{
      //      $set:{
      //        cantidadUnitariaPedido
      //      }
      //    });

    },

  // 'links.setVisibility'(_id,visible){
  //   if(!this.userId){
  //     throw new Meteor.Error('Usuario no autorizado');
  //   }
  //   new SimpleSchema({
  //     visible:{
  //       type:Boolean,
  //     },
  //     _id:{
  //       type: String,
  //       min: 1,
  //     }
  //   }).validate({visible,_id});
  //   Links.update({
  //     _id,
  //     userId:this.userId
  //   },{
  //     $set:{visible}
  //   });
  //
  // },
  // 'links.trackVisit'(_id){
  //   new SimpleSchema({
  //     _id:{
  //       type: String,
  //       min: 1,
  //     }
  //   }).validate({_id});
  //
  //   Links.update({_id:_id},{
  //     $set:{
  //       lastVisitedAt:new Date().getTime()
  //     },
  //     $inc:{
  //       visitedCount:1
  //     },
  //   });
  // },



});
