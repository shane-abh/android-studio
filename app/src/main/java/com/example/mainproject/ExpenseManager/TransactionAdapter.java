package com.example.mainproject.ExpenseManager;


import static com.example.mainproject.ExpenseManager.ExpenseDetails.checkIfEmpty;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mainproject.R;

import java.util.ArrayList;

public class TransactionAdapter extends RecyclerView.Adapter<TransactionAdapter.TViewHolder>{
    Context ctx;

    // List containing data for recyclerview
    ArrayList<FinancialsClass> transactionList;

    // Constructor for TransactionAdapter
    public TransactionAdapter(Context ctx, ArrayList<FinancialsClass> transactionList) {
        this.ctx = ctx;
        this.transactionList = transactionList;
    }


    @NonNull
    @Override
    public TViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(ctx).inflate(R.layout.transaction_row_layout,parent,false);
        return new TViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull TViewHolder holder, int position) {
        FinancialsClass a = transactionList.get(position);
        holder.tvAmount.setText(a.getAmount());
        holder.tvMessage.setText(a.getMessage());
        holder.tvCategory.setText(a.getCategory());
        holder.tvDate.setText(a.getDate());

        if(transactionList.get(holder.getAdapterPosition()).isPositive())
        {
            holder.tvAmount.setTextColor(Color.parseColor("#00c853"));
            // Setting Amount to a TextView in the row layout
            holder.tvAmount.setText("+AED"+(transactionList.get(holder.getAdapterPosition()).getAmount()));
        } else {
            holder.tvAmount.setTextColor(Color.parseColor("#F44336"));

            // Setting Amount to a TextView in the row layout
            holder.tvAmount.setText("-AED"+(transactionList.get(holder.getAdapterPosition()).getAmount()));
        }

        holder.ivDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Confirmation Alert to delete a Transaction
                AlertDialog dialog = new AlertDialog.Builder(ctx)
                        .setCancelable(false)
                        .setTitle("Are you sure? The transaction will be deleted.")
                        .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                dialogInterface.dismiss();
                            }
                        })
                        .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                transactionList.remove(holder.getAdapterPosition());
                                FirebaseAdapter fb = new FirebaseAdapter();
                                fb.remove(a.getKey()).addOnCompleteListener(task -> {
                                    System.out.println("hello3");
                                    if (task.isSuccessful()) {
                                        Toast.makeText(ctx, "Data deleted", Toast.LENGTH_SHORT).show();
                                        notifyItemRemoved(holder.getAdapterPosition());
                                    } else {
                                        Toast.makeText(ctx, "Data not deleted", Toast.LENGTH_SHORT).show();
                                    }
                                });
                                dialogInterface.dismiss();
                                notifyDataSetChanged();
                                notifyItemRangeChanged(holder.getAdapterPosition(), getItemCount(), null);
                                checkIfEmpty(getItemCount());
//                                setBalance(transactionList);
                            }
                        })
                        .create();
                dialog.show();
            }
        });

    }

    @Override
    public int getItemCount() {
        return transactionList.size();
    }

    // View Holder for a Transaction
    public static class TViewHolder extends RecyclerView.ViewHolder{
        TextView tvAmount,tvMessage,tvCategory,tvDate;
        ImageView ivDelete;

        public TViewHolder(@NonNull View itemView) {
            super(itemView);
            tvAmount = itemView.findViewById(R.id.tvAmount);
            tvMessage = itemView.findViewById(R.id.tvMessage);
            tvCategory = itemView.findViewById(R.id.tvCategoty);
            tvDate = itemView.findViewById(R.id.tvDate);
            ivDelete = itemView.findViewById(R.id.ivDelete);
        }
    }
}
