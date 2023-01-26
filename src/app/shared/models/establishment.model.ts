interface IEstablishmentModel {

    uuid: string;
    name: string;
  
  }

  export class EstablishmentModel implements IEstablishmentModel{

    static establishmentFromJson(obj: any) {
  
      return new EstablishmentModel(
        obj['uuid'],
        obj['name']
      );
    }
  
    constructor(
  
      public uuid: string,
      public name: string,
    ) {}
  }  