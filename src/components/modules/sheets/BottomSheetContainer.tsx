import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { closeSheet } from '../../../redux/sheet';
import PostManagerSheet from './PostManagerSheet';

const BottomSheetContainer: React.FC = () => {
    const [snapPoints, setSnapPoints] = useState(['10%', '50%']);

    const { isVisible, name, data } = useSelector((state: RootState) => state.sheet);
    const dispatch = useDispatch();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            dispatch(closeSheet());
        }
    }, []);

    useEffect(() => {
        if (isVisible) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isVisible]);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
            backdropComponent={BottomSheetBackdrop}
        >
            {name === 'PostManager' ? <PostManagerSheet setSnapPoints={setSnapPoints} data={data} /> : null}
        </BottomSheetModal>
    );
}

export interface BottomSheetContentProps {
    setSnapPoints: (value: any[]) => void;
    data: any;
}

export default BottomSheetContainer;
