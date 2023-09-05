export default interface Cursus {
  id: number;
  attributes: {
    periode: string;
    description: string;
    ecole: string;
    titre: string;
  };
}
