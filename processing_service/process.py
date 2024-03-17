import numpy as np
import pandas as pd

def load_df(filepath):
    df = pd.read_csv(filepath)
    
    dataInfo = {
        'rows': df.shape[0],
        'columns': df.shape[1],
        'columns_with_empty': df.isnull().any().sum(),
        'total_duplicate_rows': df.duplicated().sum(),
        'missing_percentage': df.isnull().mean().mean(),  # Mean of means for all columns
        'total_memory_used': df.memory_usage(deep=True).sum()
    }
    
    dataInfo = {k: int(v) if isinstance(v, np.int64) else v for k, v in dataInfo.items()} # Convert numpy integers to Python integers
    
    dataTypes = df.dtypes.apply(lambda x: str(x)).to_dict()
    
    
    return df, dataInfo, dataTypes

    