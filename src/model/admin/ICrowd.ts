interface ICrowd{
    cctvId:number;
    count: number;
    createdAt: string;
    crowdSeq: number;
    low: number;
    mid: number;
    zoneName: string;
    zoneType: string;
}

interface IAddCrowd{
    cctvId:number;
    count: number;
    crowdSeq: number;
    low: number;
    mid: number;
    zoneName: string;
    zoneType: string;
}

export { ICrowd, IAddCrowd };
