package com.example.mainproject.StockPlatform;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import com.example.mainproject.R;

public class PortfolioAdapter extends RecyclerView.Adapter<PortfolioAdapter.MyViewHolder> {
    Context context;

    ArrayList<userStocks> list;
    ArrayList<String> json;

    public PortfolioAdapter(Context context, ArrayList<userStocks> list) {
        this.context = context;
        this.list = list;

    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context).inflate(R.layout.portfolio_info,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        userStocks u = list.get(position);
        holder.symbol.setText(u.getSymbol());
        holder.qty.setText(u.getQty());
        holder.date.setText(u.getDate());
        holder.buyPrice.setText("$"+u.getStName());

        OkHttpClient client = new OkHttpClient();

        String url ="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+u.getSymbol()+"&apikey=OOEPKQDKWRUGS4HV";

        Request request = new Request.Builder().url(url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                if(response.isSuccessful()){
                    String myRes = response.body().string();

                    ((MyPortfolio)context).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
//                            json.add(myRes);
                                        System.out.println(myRes);
                            try {
                                String close = new JSONObject(myRes).getJSONObject("Global Quote").getString("05. price");
//                                            System.out.println(close);
                                DecimalFormat df = new DecimalFormat("#.##");
                                String price =  df.format(Double.parseDouble(close));

                                double buy = Double.parseDouble(u.getStName());
                                double current = Double.parseDouble(price);

                                double increase = current - buy;

                                double per = (increase/buy)*100;

                                System.out.println(per);

                                u.setPrice(price);
                                holder.prevClose.setText(price);

                                if (per > 0){
                                    holder.pchange.setTextColor(Color.parseColor("#00873C"));
                                    holder.pchange.setText("+"+df.format(per)+"%");
                                }else{
                                    holder.pchange.setTextColor(Color.RED);
                                    holder.pchange.setText("-"+df.format(per)+"%");
                                }

                                
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    });
                }
            }
        });
        holder.prevClose.setText(u.getPrice());

    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        TextView symbol,qty,buyPrice,date,prevClose,pchange;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            symbol = itemView.findViewById(R.id.symbol);
            qty = itemView.findViewById(R.id.qty);
            buyPrice = itemView.findViewById(R.id.buyPrice);
            date = itemView.findViewById(R.id.date);
            prevClose = itemView.findViewById(R.id.PrevClose);
            pchange = itemView.findViewById(R.id.pchange);

        }
    }
}


