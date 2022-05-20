declare namespace IService {
    export interface IProps {
        service: {
            name: string;
            serviceTypes : Array;
            lineStatuses : Array;
        };
        setValue: React.Dispatch<React.SetStateAction<Array>>
    }
}

export { IService };