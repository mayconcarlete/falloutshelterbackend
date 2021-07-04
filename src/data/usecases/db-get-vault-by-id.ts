import { Vault } from "../../domain/models/vault";
import { GetVaultById } from "../../domain/usecases/get-vault-by-id";
import { NotFoundError } from "../../presentation/errors/not-found";

export class DbGetVaultById implements GetVaultById{
    constructor(
        private readonly getVaultRepository: GetVaultById
    ){}
    getById(id: string): Promise<Vault | null> {
        const vault = this.getVaultRepository.getById(id)
        if(!vault) throw new NotFoundError('cant found a vault')
        return vault
    }
}