import { CldUploadWidget } from 'next-cloudinary';
import { CirclePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

interface ImageUploadProps {
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value }) => {
    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    return (
        <div>
            <div className='mb-4 flex flex-wrap items-center gap-4'>
                {value.map(((url, i) => (
                    <div key={i} className='relative w-[200px] h-[200px]'>
                        <div className='absolute top-2 right-2 z-1'>
                            <Button onClick={() => onRemove(url)} size="sm" className='bg-[var(--color-powder-pink)] text-white cursor-pointer hover:saturate-200'>
                                <Trash2 className='h-4 w-4'/>
                            </Button>
                        </div>
                        <Image src={url} alt='product' className='object-cover rounded-md' fill sizes='200px'/>
                    </div>
                )))}
            </div>
            <CldUploadWidget uploadPreset="hm-shop-admin" onSuccess={onUpload} >
                {({ open }) => {
                    return (
                        <Button onClick={() => open()} className='bg-[var(--color-light-beige)] text-white cursor-pointer hover:saturate-150'>
                            <CirclePlus className='h-4 w-4 mr-2' />
                            Upload Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload