import React from 'react';
import { useBank } from '../Bank';

function History() {
    const {
        cards,
        transactions,
        setTransactions,
        accountIndex,
        setAccountIndex
    } = useBank();

    const getName = x => {
        if (x.sender?.accountNumber == cards[accountIndex]?.cardNumber) {
            return x.sender;
        } else if (
            x.receiver?.accountNumber == cards[accountIndex]?.cardNumber
        ) {
            return x.receiver;
        }
    };

    return (
        <div class="absolute top-0 left-0 z-10 flex  h-full w-full flex-col gap-4 bg-[#EBEBEB] dark:bg-[#0D0D0D]">
            <div className="mt-5 px-3">
                İşlem Geçmişi
                <div className="h-full divide-y overflow-y-auto  dark:divide-[#202020] ">
                    {transactions?.map(
                        x =>
                            (x.accountNumber ==
                                cards[accountIndex]?.cardNumber ||
                                x.receiver?.accountNumber ==
                                    cards[accountIndex]?.cardNumber ||
                                x.sender?.accountNumber ==
                                    cards[accountIndex]?.cardNumber) && (
                                <div className="my-1 flex items-center justify-between py-1">
                                    <div className="flex items-center ">
                                        <img
                                            src={
                                                x.icon
                                                    ? x.icon
                                                    : getName(x)?.icon
                                            }
                                            className="mr-2 h-9 w-9 rounded-md"
                                        />
                                        <div>
                                            <p className="manrope text-[13.4534px] font-bold leading-[18px] text-[#282828] dark:text-[#D6D6D6]">
                                                {x.author?.name
                                                    ? x.author?.name
                                                    : getName(x)?.author
                                                    ? getName(x)?.author.name
                                                    : getName(x)?.name}
                                            </p>
                                            <p className="text-[11.4534px] leading-[18px] text-[#525252] dark:text-[#969696]">
                                                {x?.accountNumber
                                                    ? x?.accountNumber
                                                    : getName(x)?.accountNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="manrope text-[13.4534px] font-bold text-[#262626] dark:text-[#CDCDCD]">
                                        {x.actionType == 'withdraw' ||
                                        x.actionType == 'transfer'
                                            ? '-'
                                            : '+'}{' '}
                                        {x.amount}
                                    </p>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}

export default History;
