import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const HistorialInventario=new Mongo.Collection('historialInventario');

if(Meteor.isServer){
  Meteor.publish('historialInventario', function(){
    return HistorialInventario.find({userId:this.userId});
  });
}

Meteor.methods({
  'historialInventario.insert'(idProducto,idProveedor,inventarioInicial,inventarioFinal,cantidadUnitariaPedido){
    console.log('datos a grabar de HISTORIAL: ',idProducto,idProveedor,inventarioInicial,inventarioFinal,cantidadUnitariaPedido);

    if(!this.userId){
      throw new Meteor.Error('Usuario no autorizado');
    }

    new SimpleSchema({
      idProducto:{
        type:String,
        label:'Id del del Producto',
      },
      idProveedor:{
        type:String,
        label:'Id del Provedor',
      },
      inventarioInicial:{
        type:Number,
        label:'Inventario Inicial',
        optional: true,
      },
      inventarioFinal:{
        type:Number,
        label:'inventario final',
        optional: true,
      },
      cantidadUnitariaPedido:{
        type:Number,
        label:'Cantidad de unidades que tiene el pedido',
        optional: true,
      },


    }).validate({idProducto,idProveedor,inventarioInicial,inventarioFinal,cantidadUnitariaPedido});

    // var inventarioInicialTemp=(unidadesXCaja *cantidadCajas )+cantidadUnitaria;
    historialInventario.insert({
      idProducto:idProducto,
      idProveedor:idProveedor,
      userId:this.userId,
      inventarioInicial:inventarioInicial,
      inventarioFinal:inventarioFinal,
      cantidadUnitariaPedido:cantidadUnitariaPedido,
      createdAt:new Date()

    });

  },
    //
    // 'productos.updateInventario'(_id,cantidadUnitaria,cantidadCajas,unidadesXCaja){
    //   if(!this.userId){
    //      throw new Meteor.Error('Usuario no autorizado');
    //    }
    //    new SimpleSchema({
    //
    //      cantidadUnitaria:{
    //        type:Number,
    //        label:'Cantidad de unidades sueltas',
    //        optional: true,
    //
    //      },
    //      cantidadCajas:{
    //        type:Number,
    //        label:'Cantidad de Cajassss',
    //        optional: true,
    //
    //      },
    //      //
    //     //  fecha:{
    //     //    type:Date,
    //     //    label:'Cantidad de Cajas',
    //     //  },
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
    //      if(Productos.findOne({_id}).modifiedAt< new Date()){
    //        var inventarioFinalTemp=(unidadesXCaja *cantidadCajas )+cantidadUnitaria;
    //        Productos.update({
    //            _id,
    //            userId:this.userId
    //          },{
    //            $set:{
    //              cantidadUnitaria,
    //              cantidadCajas,
    //              inventarioFinal:inventarioFinalTemp,
    //            }
    //          });
    //      }
    //      console.log("Hola");
    //      console.log("la id ", _id);
    //      console.log("cantidad unitaria "+ cantidadUnitaria);
    //
    //
    //      console.log(Productos.find({_id}).fetch());
    //      console.log("fecha anterior",Productos.findOne({_id}).modifiedAt);
    //      console.log("fecha actual",new Date());
    //
    //     //  if(Productos.find({_id}).)
    // },
    //
    // 'productos.updatePedido'(_id,cantidadUnitariaPedido){
    //   if(!this.userId){
    //      throw new Meteor.Error('Usuario no autorizado');
    //    }
    //    new SimpleSchema({
    //
    //      cantidadUnitariaPedido:{
    //        type:Number,
    //        label:'Cantidad de unidades del pedido',
    //        optional: true,
    //
    //      },
    //
    //    }).validate({cantidadUnitariaPedido});
    //    if(Productos.findOne({_id}).modifiedAt < new Date() ){
    //      console.log("la fecha actual es mayor, actualizo en inventario inicial")
    //      Productos.update({
    //          _id,
    //          userId:this.userId
    //        },{
    //          $set:{
    //            cantidadUnitariaPedido,
    //            modifiedAt:new Date(),
    //            inventarioInicial:Productos.findOne({_id}).inventarioFinal+cantidadUnitariaPedido
    //          }
    //        });
    //    }else{
    //      Productos.update({
    //          _id,
    //          userId:this.userId
    //        },{
    //          $set:{
    //            cantidadUnitariaPedido
    //          }
    //        });
    //    }

    //
    // },





});
