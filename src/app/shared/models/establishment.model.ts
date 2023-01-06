interface IEstablishment {

    uuid: string;
    name: string;
  
  }

  export class Establishment implements IEstablishment{

    static establishmentFromJson(obj: any) {
  
      return new Establishment(
        obj['uuid'],
        obj['name']
      );
    }
  
    constructor(
  
      public uuid: string,
      public name: string,
    ) {}
  }  