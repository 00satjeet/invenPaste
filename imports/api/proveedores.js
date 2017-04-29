import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Proveedores=new Mongo.Collection('proveedores');

if(Meteor.isServer){
  Meteor.publish('proveedores', function(){
    return Proveedores.find();
  });
}

Meteor.methods({

  'proveedores.insert'(nombreProveedor,formaPago,pedidoMinimo,diasDespacho,telefono1,telefono2){
    console.log('datos a grabar: ',nombreProveedor ,formaPago ,pedidoMinimo,diasDespacho,telefono1,telefono2);
    if(!this.userId){
      throw new Meteor.Error('Usuario no autorizado');
    }

      const validationContext = new SimpleSchema({
        nombreProveedor:{
          type:String,
          label:'Nombre del Producto',
        },
        formaPago:{
          type:String,
          label:'Forma de pago',
          optional: true,
        },
        pedidoMinimo:{
          type: Number,
          label:'Dinero minimo para hacer el pedido',
          optional: true,
        },
        diasDespacho:{
          type:String,
          label:'Dias que demora el despacho',
          optional: true,
        },
        telefono1:{
          type: String,
          label:'telefono Principal',
          optional: true,
        },
        telefono2:{
          type: String,
          label:'Telefono secundario',
          optional: true,
        }
      }).validate({nombreProveedor,formaPago,pedidoMinimo,diasDespacho,telefono1,telefono2});


    Proveedores.insert({
      nombreProveedor:nombreProveedor,
      formaPago:formaPago,
      pedidoMinimo:pedidoMinimo,
      diasDespacho:diasDespacho,
      telefono1:telefono1,
      telefono2:telefono2,
      pedidoRealizado:false,
      visible:true,
      modifiedAt:new Date()

    });

  },
  'proveedores.updateFechaPedido'(_id){
    if(!this.userId){
       throw new Meteor.Error('Usuario no autorizado');
     }
     console.log("pregunto si puedo modificar la fecha");
     console.log("la id del proveedor en updateFechaPedido es:"+_id);
     console.log("la fehca es"+Proveedores.findOne({_id}).modifiedAt.toJSON());


     if(Proveedores.findOne({_id}).modifiedAt < new Date() ){
       console.log("la fecha actual del proveedor es mayor, se actualiza la fecha");
       Proveedores.update({
           _id
         },{
           $set:{
             modifiedAt:new Date(),

           }
         });
     }else{
       console.log("No se actualiza la fecha del proveedor");

     };
   },
    //
    // 'proveedores.update'(_id,cantidadUnitaria,cantidadCajas){
    //   if(!this.userId){
    //      throw new Meteor.Error('Usuario no autorizado');
    //    }
    //    new SimpleSchema({
    //
    //      cantidadUnitaria:{
    //        type:Number,
    //        label:'Cantidad de unidades sueltas',
    //      },
    //      cantidadCajas:{
    //        type:Number,
    //        label:'Cantidad de Cajas',
    //      },
    //    }).validate({cantidadUnitaria,cantidadCajas});
    //
    //    Proveedores.update({
    //        _id,
    //        userId:this.userId
    //      },{
    //        $set:{
    //          cantidadUnitaria,
    //          cantidadCajas
    //        }
    //      });
    // },

});
