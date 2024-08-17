"use client";

type PageBuilderProps = {
    title: string;
    children: React.ReactNode;
    width?: 'lg' | 'sm';
};

const PageBuilder: React.FC<PageBuilderProps> = ({ title, children, width = 'lg' }) => {
    const containerWidthClass = width === 'sm' ? 'max-w-sm' : 'max-w-lg';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className={`w-full ${containerWidthClass} p-8 bg-white shadow-lg rounded-lg`}>
                <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default PageBuilder;
