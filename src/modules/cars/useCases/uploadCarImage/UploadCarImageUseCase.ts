import { inject, injectable } from "tsyringe";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private CarsImagesRepository: ICarsImagesRepository
    ){}
    
    async execute ({car_id, images_name}: IRequest) {
        
    }
}

export { UploadCarImageUseCase };
