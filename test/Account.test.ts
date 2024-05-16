import { BankAccount } from "../src/BankAccount";
import { Statement } from "../src/Statement";
import { StatementRepository } from "../src/StatementRepository";

describe('Account test', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    it('should print the header of the statements', () => {
        const logSpy = jest.spyOn(console, 'log')
        const mockRepository: StatementRepository = {
            addStatement: jest.fn(),
            getAllStatements: jest.fn().mockReturnValue([])
        }
        const account = new BankAccount(mockRepository)
        account.printStatements()
        expect(logSpy).toHaveBeenCalledTimes(1)
        expect(logSpy).toHaveBeenCalledWith('Date\t\tAmount\t\tBalance');
    });
    it('should print the header and one deposit statement', () => {
        const logSpy = jest.spyOn(console, 'log')
        const statement1 = new Statement(new Date('3/15/2025'), 400, 400)
        const mockRepository: StatementRepository = {
            addStatement: jest.fn(),
            getAllStatements: jest.fn().mockReturnValue([statement1])
        }
        const account = new BankAccount(mockRepository)

        account.deposit(400)
        account.printStatements()

        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenNthCalledWith(1, 'Date\t\tAmount\t\tBalance');
        expect(logSpy).toHaveBeenNthCalledWith(2, '15.03.2025\t+400\t\t400');
    });
    it('should print the header and one withdraw statement', () => {
        const logSpy = jest.spyOn(console, 'log')
        const statement1 = new Statement(new Date('3/5/2025'), -400, -400)
        const mockRepository: StatementRepository = {
            addStatement: jest.fn(),
            getAllStatements: jest.fn().mockReturnValue([statement1])
        }
        const account = new BankAccount(mockRepository)

        account.withdraw(400)
        account.printStatements()

        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenNthCalledWith(1, 'Date\t\tAmount\t\tBalance');
        expect(logSpy).toHaveBeenNthCalledWith(2, '05.03.2025\t-400\t\t-400');
    });
    it('should print the header and two operations', () => {
        const logSpy = jest.spyOn(console, 'log')
        const statement1 = new Statement(new Date('3/5/2025'), -400, -400)
        const statement2 = new Statement(new Date('11/13/2025'), 1400, 600)
        const mockRepository: StatementRepository = {
            addStatement: jest.fn(),
            getAllStatements: jest.fn().mockReturnValue([statement1, statement2])
        }
        const account = new BankAccount(mockRepository)

        account.withdraw(400)
        account.deposit(1400)
        account.printStatements()

        expect(logSpy).toHaveBeenCalledTimes(3)
        expect(logSpy).toHaveBeenNthCalledWith(1, 'Date\t\tAmount\t\tBalance');
        expect(logSpy).toHaveBeenNthCalledWith(2, '05.03.2025\t-400\t\t-400');
        expect(logSpy).toHaveBeenNthCalledWith(3, '13.11.2025\t+1400\t\t600');
    });
});
