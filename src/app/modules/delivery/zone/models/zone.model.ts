export class ZoneModel {
    id: string;
    name: string;

    setZone(_zone: unknown) {
        const zone = _zone as ZoneModel;
        this.id = zone.id || '';
        this.name = zone.name || '';
      }
}
   

